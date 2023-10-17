// App models
interface iReply {
  name: string;
  reply: string;
}

interface iComment {
  name: string;
  comment: string;
  time: number;
  showReply: boolean;
  replies?: iReply[];
}

// API models
interface iRespMetadata {
  id: string;
  private: boolean;
}

interface iCallAPIReq {
  comments: iComment[];
}

interface iGetCommentsResp {
  comments: iComment[];
}

interface iCallAPIResp {
  record: iGetCommentsResp;
  metadata: iRespMetadata;
}

export {
  iReply,
  iComment,
  iRespMetadata,
  iGetCommentsResp,
  iCallAPIReq,
  iCallAPIResp
}
