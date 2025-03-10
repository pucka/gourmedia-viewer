import { getDay } from "date-fns";
import { FoodData, Menu } from "../types/Menu";

export default function parseMenu(weekMenu: FoodData[]): Menu[] {
  const today = getDay(new Date()) - 1;

  return weekMenu.map((dayMenu, idx) => {
    const courses = dayMenu.menu
      ?.split(/\n(.*)\t|\n/)
      .filter((arr) => arr.trim());
    return {
      day: dayMenu.day,
      isPast: idx < today,
      isToday: today === idx,
      menu: courses.map((course, courseIdx) => {
        let [header, description] = course.trim().split(/\t|\n|\s{3,}/);
        if (!description) {
          description = header;
          header = `Maträtt ${courseIdx + 1}`;
        }
        return {
          type: header || "",
          dish: description || "",
        };
      }),
    };
  });
}
