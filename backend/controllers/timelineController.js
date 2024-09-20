import Timeline from "../models/timelineModel.js"

export async function dataSeeder(req, res){
    Timeline.create({
            title: "Bobbity BOOO!",
            time: 123,
    })
}