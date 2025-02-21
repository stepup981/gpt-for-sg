export interface IToken {
  access_token: string;
  expires_at: number;
}

interface IModel {
  id: "GigaChat" | "GigaChat-Pro" | "GigaChat-Max" | string;
  object: string;
  owned_by: string;
  type?: string;
}

export interface IResponseModels {
  data: IModel[];
  object: string;
}

interface IMessage {
  content: string;
  role: string;
}

export interface IResponseMessage {
  choices: {
    message: IMessage;
    index: number;
    finish_reason: string;
  }[];
  created: number;
  model: string;
  object: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    precached_prompt_tokens: number;
  };
}
