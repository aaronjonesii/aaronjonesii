import { firebaseTimestamp } from "./timestamp";
import { FieldValue } from "@angular/fire/firestore/firebase";

export interface Project {
  id?: string,
  name: string,
  description: string,
  content: string | null,
  image: string | null,
  tags: string[] | null,
  livePreviewLink: string | null,
  sourceCodeLink: string | null,
  status: ProjectStatusType,
  visibility: ProjectVisibilityType,
  created: firebaseTimestamp,
  updated: firebaseTimestamp | null,
  featured: boolean,
  allowComments: boolean
}

export type ProjectStatusType = "draft" | "archived" | "published";
export const ProjectStatuses = ["draft", "archived", "published"];

export type ProjectVisibilityType = "public" | "private";
export const ProjectVisibilities = ["public", "private"];

export interface ProjectWithID extends Project { id: string; }
export interface WriteProject extends Project { created: FieldValue, updated: FieldValue | null }
