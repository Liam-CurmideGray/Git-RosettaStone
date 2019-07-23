import figlet from "figlet";
import chalk from "chalk";


export function titleScreen() {
    
    figlet(`Starwars`, function(err: Error | null, result?: string | undefined): void {
    if(err != null) {
        console.log("Something went wrong");
        console.dir(err.message);
       
    }

    console.log(chalk.red.bold(result || "No data"));
});
};