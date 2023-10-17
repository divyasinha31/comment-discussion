import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { iComment, iReply, iCallAPIReq, iCallAPIResp } from './model';
import { CommentService } from './comment.service';
import { EDIT_BY, HEADING, POST_COMMENT, POST_REPLY, REPLY_TO, UPDATE_COMMENT } from './constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  commentForm: FormGroup;
  comments: iComment[];
  heading: string;
  buttonText: string;

  private currentReplyIndex: number | undefined;
  private currentEditIndex: number | undefined;

  constructor(private formBuilder: FormBuilder,
              private commentService: CommentService) {
    this.commentForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      comment: new FormControl('', Validators.required)
    });

    this.heading = HEADING;
    this.buttonText = POST_COMMENT;
  }

  // Angular lifecycle hooks
  ngOnInit(): void {
    this.getComments();
  }

  // Private methods
  private getComments() {
    this.commentService.getComments().subscribe((data : iCallAPIResp) => {
      this.comments = data.record.comments;
    });
  }

  private resetViewReplies() {
    this.comments.forEach(comment => comment.showReply = false);
  }

  private addNewComment() {
    const comment: iComment = {
      name: this.commentForm.controls['name'].value,
      comment: this.commentForm.controls['comment'].value,
      time: Date.now(),
      showReply: false,
      replies: []
    };
    this.comments.push(comment);
    this.resetViewReplies();

    const params: iCallAPIReq = {
      comments : this.comments
    };

    this.commentService.updateComment(params).subscribe((data : iCallAPIResp) => {
      this.comments = data.record.comments;
      this.resetValues();
    }, (error) => {
      this.comments.pop();
    });
  }

  private updateComment() {
    const comment: iComment = {
      name: this.commentForm.controls['name'].value,
      comment: this.commentForm.controls['comment'].value,
      time: Date.now(),
      showReply: false,
      replies: this.comments[this.currentEditIndex as number].replies
    }
    this.comments[this.currentEditIndex as number] = comment;
    this.resetViewReplies();

    const params: iCallAPIReq = {
      comments : this.comments
    };

    this.commentService.updateComment(params).subscribe((data : iCallAPIResp) => {
      this.comments = data.record.comments;
      this.resetValues();
    });
  }

  private addReply() {
    const reply: iReply  = {
      name: this.commentForm.controls['name'].value,
      reply: this.commentForm.controls['comment'].value
    }
    this.comments[this.currentReplyIndex as number].replies?.push(reply);
    this.resetViewReplies();

    const params: iCallAPIReq = {
      comments : this.comments
    };

    this.commentService.updateComment(params).subscribe((data : iCallAPIResp) => {
      this.comments = data.record.comments;
      this.resetValues();
    }, (error) => {
      this.comments[this.currentReplyIndex as number].replies?.pop();
    });
  }

  private resetValues() {
    this.commentForm.reset();
    this.heading = HEADING;
    this.buttonText = POST_COMMENT;

    this.currentReplyIndex = undefined;
    this.currentEditIndex = undefined;
  }

  // HTML functions
  openReply(index: number) {
    this.resetValues();
    this.heading = REPLY_TO.concat(this.comments[index].name);
    this.buttonText = POST_REPLY;
    this.currentReplyIndex = index;
  }

  editComment(index: number, comment: iComment) {
    this.heading = EDIT_BY.concat(this.comments[index].name);
    this.buttonText = UPDATE_COMMENT;
    this.currentEditIndex = index;

    this.commentForm.controls['name'].setValue(comment.name);
    this.commentForm.controls['comment'].setValue(comment.comment);
  }

  post() {
    this.currentReplyIndex
    ? this.addReply() 
    : this.currentEditIndex
    ? this.updateComment()
    : this.addNewComment();
  }
}
