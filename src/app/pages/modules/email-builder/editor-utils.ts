import { inject } from "@angular/core";
import { UserTemplatesService } from "../../../services/user-templates/user-templates.service";

const userTemplateService = inject(UserTemplatesService);

const uid = sessionStorage.getItem("uid");

export const editorConfig = {
    
  };