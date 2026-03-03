const prompt = require("prompt-sync")({ sigint: true });

/*
fish - {
    name: string
    weight: number
    value: number
}

*/

//generates a random name
const generateRandomName = () => {
    //first adjective options
    const adj1Arr = ["Large", "Small", "Scaly", "Slimy", "Quick"]

    //second adjective options
    const adj2Arr = ["Smooth", "Wild", "Slippery", "Gentle", "Striped"]

    //fish type options
    const typeArr = ["Salmon", "Trout", "Catfish", "Bass", "Cod"]

    //get random 1st adjective
    let adj1Index = Math.floor(Math.random() * adj1Arr.length)
    let adj1 = adj1Arr[adj1Index]

    //get random 2nd adjective
    let adj2Index = Math.floor(Math.random() * adj2Arr.length)
    let adj2 = adj2Arr[adj2Index]

    //get random type
    let typeIndex = Math.floor(Math.random() * typeArr.length)
    let type = typeArr[typeIndex]

    //put them together: adj1 adj2 type
    let fish = `${adj1} ${adj2} ${type}`

    return fish
}

//generates a random number for weight, 10 is our weight limit
const generateRandomWeight = () => {
    //toFixed(2) rounds to two decimal places, but turns it to a string
    //so we convert to a number with Number()
    return Number((Math.random() * 9).toFixed(2))
}

//generates a random number for price, 40 seems like a good expensive price max
const generateRandomPrice = () => {
    //toFixed(2) rounds to two decimal places, but turns it to a string
    //so we convert to a number with Number()
    return Number(((Math.random() * 40).toFixed(2)) + 2)
}

//generates our fish with random attributes
const generateRandomFish = () => {
    //random name
    let fishName = generateRandomName()

    //random weight
    let fishWeight = generateRandomWeight()
    
    //random value
    let fishPrice = generateRandomPrice()

    //our new fish object
    let newFish = {
        name: fishName,
        weight: fishWeight,
        value: fishPrice
    }

    // console.log(newFish)
    return newFish
}

//display fish caught
const displayCaughtFish = (fish) => {
    console.log(`You caught a '${fish.name}' weighing ${fish.weight} lbs and valued at $${fish.value}`)
}

//next goal: 
    //creating a UI with console.logs/prompts like we did for the to-do list
    //make it so player can catch OR release fish
    //6 turns long

//variables for tracking totals
let time = 6
let totalFishCaught = 0
let totalWeightCaught = 0
let totalPriceCaught = 0
let caughtFishArr = []

//catching fish
const catchingFish = (input, fishCaught) => {
    time += 1
    if (input === "k") {
        totalWeightCaught +=fishCaught.weight
        if(totalWeightCaught > 10) {
            console.log("This fish would put you over 10 lbs, so you release it.")
            totalWeightCaught -= fishCaught.weight
            console.log("Press [enter] to continue.")
            input = prompt("> ").trim()
        } else {
            totalFishCaught += 1
            // totalWeightCaught += fishCaught.weight
            totalPriceCaught += fishCaught.value
            caughtFishArr.push(fishCaught)
            console.log("You chose to keep the fish.")
        }
    } else if (input === "r") {
        console.log("You chose to release the fish.")
    } else {
        console.log("Invalid Input")
    }
}

//UI

const welcome = "\nYou've gone fishing! Try to maximize the value of your caught fish. You can fish for six hours (till 12:00pm) and can catch at most 10 lbs of fish."


const display = () => {

    while (time < 12) {

        console.log("\n==========================================\n")
        console.log(`The time is ${time}:00am. So far you've caught: ${totalFishCaught} fish, ${totalWeightCaught} lbs, $${totalPriceCaught}\n`)

        const fishCaught = generateRandomFish()
        // console.log(fishCaught)
        displayCaughtFish(fishCaught)

        console.log("Your action: [k]eep or [r]elease?")
        let input = prompt("> ").trim()

        catchingFish(input, fishCaught)

        console.log(`The time is ${time}:00am. So far you've caught: ${totalFishCaught} fish, ${totalWeightCaught} lbs, $${totalPriceCaught}\n`)
    }

    if (time === 12) {
        console.log("\n==========================================\n")
        console.log("The time is 12:00pm. Times up!\n")

        console.log(`You caught ${caughtFishArr.length} fish:`)
        
        for (i = 0; i < caughtFishArr.length; i++) {
            console.log(`* ${caughtFishArr[i].name}, ${caughtFishArr[i].weight} lbs, $${caughtFishArr[i].value}`)
        }

        console.log(`\nTotal weight: ${totalWeightCaught} lbs`)
        console.log(`Total price: $${totalPriceCaught}\n`)
    }
}
console.log(welcome)
display()