import { createContext, useContext } from "react";

export const TodayEmoji = createContext<String | undefined>(undefined);

export function useTodayEmoji() {
    const emoji = useContext(TodayEmoji);
    if(emoji === undefined) {
        throw new Error("useMyContext must be used with a String value.")
    }
    return emoji;
}