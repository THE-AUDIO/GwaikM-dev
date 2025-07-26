import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { AddMessage } from "../models/add-message.model";
import { tap } from "rxjs";
import { ThemDto } from "../models/theme.dto";
import { environment } from "../../../environments/environment.development";

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    currentSession = signal(0);
    private http = inject(HttpClient)
    apiUrl = environment.apiURL;
    allTheme = signal<ThemDto[]>([] as ThemDto[]);
    session = localStorage.getItem('nandra-session')
    askQuestion(message: AddMessage) {
        const themeState = localStorage.getItem('themeState')
        console.log(themeState);
        
        if (themeState == "no") {
            localStorage.setItem("themeState", "yes")
            this.geneRateTheme(message.question).subscribe()
        }
        return this.http.post<string>(`${this.apiUrl}/send-message`, message.question).pipe(
            tap((val) => {
                message.response = val;
                console.log(val);
                this.AddMessage(message).subscribe();
            })
        )
    }

    getAllMessageBysession(id: number) {
        return this.http.get(`${this.apiUrl}/get-messages-by-session?session_message=${id}`)
    }
    welcome() {
        return this.http.get(`${this.apiUrl}/`)
    }
    geneRateTheme(message: string) {
        const newTheme = new ThemDto()
        newTheme.session = newTheme.session = this.session !== null && this.session !== undefined ? Number(this.session) : 1;;
        return this.http.post<string>(`${this.apiUrl}/generate-theme`, message).pipe(
            tap((val) => {
                console.log(val);
                newTheme.theme = val;
                this.AddConversationTheme(newTheme).subscribe(() => {
                    this.getAllTheme()
                })
            })
        );
    }
    AddConversationTheme(newTheme: ThemDto) {
        return this.http.post<ThemDto>(`${this.apiUrl}/add-conversation-theme`, newTheme)
    }
    getAllTheme() {
        return this.http.get(`${this.apiUrl}/get-all-conversation-theme`).pipe(
            tap((val: any) => {
                const len = val.themes.length;
                if (len==0) {
                    localStorage.setItem('nandra-session','0')
                } else{
                    this.currentSession.set(val.themes[len - 1].session)
                    this.allTheme.set(val.themes)
                    console.log(this.currentSession());
                }
                

            })
        ).subscribe();
    }
    sendQuestionWithImage(data: { question: string, image: File }) {
        const formData = new FormData();
        formData.append('question', data.question); // doit être exactement "question"
        formData.append('file', data.image);
        const imageMessage = new AddMessage();
        imageMessage.question = data.question;
        imageMessage.session = this.session != undefined ? parseInt(this.session) : 1;
        const themeState = localStorage.getItem('themeState')
         if (themeState == "no") {
            localStorage.setItem("themeState", "yes")            
            this.geneRateTheme(data.question).subscribe()
        }
        return this.http.post(`${this.apiUrl}/send-message-image`, formData);
    }
    AddMessage(newMes:AddMessage){
        return this.http.post(`${this.apiUrl}/add-message`, newMes);
    }
}