import { ListItemBuilder } from "sanity/structure";
import defineStructure from "../utils/defineStructure";

// import { Calendar, CalendarDown, CalendarUp } from '@mynaui/icons-react'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title("Kollektioner")
    .schemaType("collection")
    .child(S.documentTypeList("collection")),
);
