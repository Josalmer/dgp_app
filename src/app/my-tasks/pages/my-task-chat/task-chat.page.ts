import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/shared/services/chat.service';
import { MyTasksService } from 'src/app/shared/services/my-tasks.service';

@Component({
  selector: 'app-task-chat',
  templateUrl: 'task-chat.page.html'
})
export class TaskChatPage implements OnInit {
  taskId: string;
  //task contendrá por ejemplo id, descripcion y mensajes
  task: any;

  constructor(
    private route: ActivatedRoute,
    private taskService: MyTasksService,
    private router: Router,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.taskId = params['id'];
      this.loadTask();
    });
  }

  loadTask(): void {
    this.taskService.getMockTaskById(this.taskId).subscribe(
      response => this.task = response
    );
  }

  navigateBack(id: string): void {
    this.router.navigateByUrl('/tabs/my-tasks/' + id + '/info');
  }

  sendMessage(message: string): void {
    const params = {
      identifier: this.taskId,
      body: message
    };
    this.chatService.sendMessage(params).subscribe(
      response => this.loadTask(),
      error => alert(error)
    );
  }

}