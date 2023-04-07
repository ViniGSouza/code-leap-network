export type Post = {
  count: number;
  next: string;
  previous: boolean;
  results: [
    {
      id: number;
      username: string;
      created_datetime: string;
      title: string;
      content: string;
    }
  ]
}