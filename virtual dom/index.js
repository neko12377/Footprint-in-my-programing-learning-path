import createElement from "./createElement";
import render from "./render";
import mount from "./mount";
import diff from "../diff";

const createVApp = (count) => {
    createElement("div", {
        attrs: {
            id: "app",
            dataCount: count,
        },
        children: [
            createElement("input"),
            String(`Current count: ${count}`),
            ...Array.from({length: count}, () =>
                createElement("img", {
                    attrs: {
                        src: "https://i.imgur.com/4AiXzf8.jpg",
                    }
                })
            )
        ]
    })
}

let count = 0;
let vApp = createVApp(count);