import { FieldValue } from "@angular/fire/firestore";

export interface Project {
  id: string,
  name: string,
  description: string,
  content: string,
  image?: string,
  tags?: string[],
  livePreviewLink?: string,
  sourceCodeLink?: string,
  status: "draft" | "archived" | "published",
  visibility: "public" | "private",
  created: FieldValue,
  updated?: FieldValue,
  featured: boolean,
  allowComments: boolean
}
