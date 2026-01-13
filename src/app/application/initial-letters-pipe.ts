import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "initialLetters",
})
export class InitialLettersPipe implements PipeTransform {
    transform(value: string): string {
        return value
            .split(" ")
            .map((word) => word.charAt(0))
            .join("")
            .toUpperCase()
            .slice(0, 2);
    }
}
