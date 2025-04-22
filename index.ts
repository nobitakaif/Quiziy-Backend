import expres, { response } from "express"
import cors from "cors"
import { GoogleGenAI } from "@google/genai"
import { GoogleGenerativeAI } from "@google/generative-ai"

const ai = new GoogleGenAI( {apiKey:"AIzaSyBI_rcNNuwuEx5lzIzlKZjjPvfVOosC01g"} );
// const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
const app = expres()

app.use(expres.json())
app.use(cors())

// app.post('/prompt',async function(req,res){
//     const difficultyLevel = req.body.difficultyLevel
//     const topic = req.body.topic
//     const question = req.body.question

//     if(!difficultyLevel || !topic || !question){
//         res.send("give me the all the details")
//         return 
//     }


//     try{
//         const result = await model.generateContentStream({
//             contents: [
//                 {
//                     role: "user", 
//                     parts: [{text: "i am giving a topic you have ask me questoin related to the topic and along with the question i'll give you difficulty level and number of question based on you have to ask me queston exact related the topic with provided difficulty level and number of question don't give me anything else. each question should be with number like Q.1 - like this , This is the topic " + topic + ", This is difficulty level "+ difficultyLevel + ", and number of question is " + question + " and you have to give me the answer of every quesion like ans.1 - like this. you need to ask to exact related the topic please don't ask out of the topic and if the difficulty level is more then medium then ask very difficult question that no one is able to give answer easily because you have act like interviewer, you don't need to mark the difficuly level anywhere, try to give response  should be like [[{'what it 2+2'}]] question answer should be in different obj like [[{'what is 2+2'}], [{'what is 3-3'}]] like this and please do not add anyword in the starting or ending like ```json[]```. why are you using ```json in starting end also using  in the end ``` this. you don't need return anything else just start response like this [[{}],[{}}]. Your response must be strictly valid JSON array like this: [[{{'Q.1': 'abc'}}], [{{'Q.2': 'xyz'}}]]. Do not skip anything. No explanation. No extra text."}]
//                 }
//             ],
//             generationConfig: {
//                 maxOutputTokens: 50000,
                
//             }
//         });
//         console.log((await result.response).text)
//             const answer = (await result.response).candidates?.[0]?.content?.parts?.[0]?.text?.trim();
       
//             const sleep = (ms:any) => new Promise(resolve => setTimeout(resolve, ms))
//             await sleep(20000)

//         // // const finalAnswer = ((await result.response).text())
//         // // res.status(200).send(finalAnswer)
//         // // console.log(typeof(finalAnswer))

//         // let fixedAnswer = answer?.replace(/'/g, '"')
//         // fixedAnswer = fixedAnswer?.replace(/([{,]\s*)([A-Za-z0-9_.]+)\s*:/g, '$1"$2":')
//         // if(!fixedAnswer){
//         //     res.send(500)
//         //     return
//         // }
//         // const parsedAnswer = JSON.parse(fixedAnswer)
//         // res.status(200).json(parsedAnswer) 

//         // const answer = (await result.response).candidates?.[0]?.content?.parts?.[0]?.text?.trim();

// console.log("AI Raw Answer -->", answer)

// // let fixedAnswer = answer?.replace(/'/g, '"')

// // if (!fixedAnswer?.endsWith(']')) {
// //    fixedAnswer += ']'
// // }

// // let parsedAnswer;
// // try {
// //     if(!fixedAnswer){
// //         res.send(500)
// //         return
// //     }
// //    parsedAnswer = JSON.parse(fixedAnswer)
// // } catch (err) {
// //    console.log("JSON parse error", err)
// //     res.status(500).send("Invalid JSON format from AI")
// //     return
// // }

// // res.status(200).json(parsedAnswer)
// res.send(200)

//     }catch(e){
//         res.send("something went wrong")
//         return
//     }
// })


app.post("/prompt",async function(req,res){
    const difficultyLevel = req.body.difficultyLevel
    const topic = req.body.topic
    const question = req.body.question
    if(!difficultyLevel || !topic || !question){
        res.status(400).send("body is not present ")
        return 
    }
    const response = await ai.models.generateContent({
        model:"gemini-1.5-flash",
        contents:[{
            role:"user",
            // parts:[{text:"i am giving a topic you have ask me questoin related to the topic and along with the question i'll give you difficulty level and number of question based on you have to ask me queston exact related the topic with provided difficulty level and number of question don't give me anything else. each question should be with number like Q.1 - like this , This is the topic " + topic + ", This is difficulty level "+ difficultyLevel + ", and number of question is " + question + " and you have to give me the answer of every quesion like ans.1 - like this. you need to ask to exact related the topic please don't ask out of the topic and if the difficulty level is more then medium then ask very difficult question that no one is able to give answer easily because you have act like interviewer, you don't need to mark the difficuly level anywhere, try to give response  should be like [[{'what it 2+2'},{'ans':'4'}]] question answer should be in different obj like [[{'what is 2+2'},{2}], [{'what is 3-3'},{0}]] like this and please do not add anyword in the starting or ending like ```json[]```. why are you using ```json in starting end also using  in the end ``` this. you don't need return anything else just start response like this [[{}],[{}}]. Your response must be strictly valid JSON array like this: [[{{'Q.1': 'what is 2+2'},{'ans':'2'}}], [{{'Q.2': 'what is 2-2'},{'ans':'0'}}]]. Do not skip anything. No explanation. No extra text."}],
            parts:[
                {text:"i will give you a topic, difficultylevel and nummber of question based on the topic and difficulty Level you have to ask me question related to the topic. do not return me anything else if the number of question is 10 then ask me only 10 question not extra and less. here is difficulty Level " + difficultyLevel + " here is the topic "+ topic + " here is the number of question " + question + ". you don't need to give me this answer of questoin just ask me only question. if the difficulty level is more than medium then you have to ask me very difficult question because you have to act like an interviewe .you have return me response in the form of array like ['waht is 2+2', 'what is 3-3'] something like this. please don't start response like this ```json[]```, don not use this format and also give me the answer of every question just like this ['what is 2+2' '2']. please do not send response with ``` ticks do not use, just use only [......] this not ```[....]``` this. r "}
            ],
                         
        }]
      });
    const result = response.text

    console.log(typeof(result))
    console.log(result)
    res.status(200).json({
        finalAnswer:result
    })
})


app.post("/check",async function(req,res){
    // check the ans is correct or not 
    // parse the question and answer in the body  
})


app.post("/checkbox",async function(req,res){
    const difficultyLevel = req.body.difficultyLevel
    const topic = req.body.topic
    const question = req.body.question

    if(!difficultyLevel || !topic || !question){
        res.send("give me the all the details")
        return 
    }
    try{
        // const resposne = await ai.models.generateContent({
        //     model:"gemini-1.5-flash",
        //     contents: [
        //         {
        //             role:"user",
        //             parts:[{text:"i am giving you a topic and you have to ask me question related to the topic and you have to give me in the form of mcq like first give me the question Q.1 and then below give me 4 option and based on the question i'll select one these option, here's the topic " + topic + " and difficulty level " + difficultyLevel + " and number of question " + question + "and option word's length should be short and try to everytime you need to mu`st ask different question, and if the user give the difficulty level of more than medium then give the very difficult question because no one is easily able to give the answer and you have to act like and interviewer and  you have to give the response in the form of json object like [{ 'Q.1' : 'what is 2+2', [{'a' : '5' }, {'b' : '8'} , {'c' : '10'}, {'d' : '4'}] }] you have to follow this pattern and you have to give the option in few word don't send larg option's length"}],
        //         //     generationConfig: {
        //         //         maxOutputTokens: 100000,
                       
        //         //   }
        //         }
        //     ],
           
        // });

        async function main(){
            const response = await ai.models.generateContent({
                model:"gemini-1.5-flash",
                contents:[{
                    role:"user",
                    // parts:[{
                    //         text:`i am giving you a topic and you have to ask me question related to the topic and you have to give me in the form of mcq like first give me the question Q.1 and then below give me 4 option and based on the question i'll select one these option, here's the topic  ${topic}  and difficulty level  ${difficultyLevel}  and number of question  ${question} and option word's length should be short and try to everytime you need to must ask different question, and if the user give the difficulty level of more than medium then give the very difficult question because no one is easily able to give the answer and you have to act like and interviewer and
                    //         Act like a strict interviewer.

                    //         Rules:
                    //         1. You must always respond only in valid JSON array format.
                    //         2. Each question should be like:
                    //         [
                    //         {
                    //             "Q.1": "Your question here?",
                    //             "options": [
                    //             { "a": "option1" },
                    //             { "b": "option2" },
                    //             { "c": "option3" },
                    //             { "d": "option4" }
                    //             ]
                    //         }
                    //         ]
                    //         3. The option value must be maximum 2-3 words only.
                    //         4. Escape inner double quotes like this: \".
                    //         5. Do not add any explanation.
                    //         6. Generate ${question} number of questions on topic: ${topic}.
                    //         7. Difficulty: ${difficultyLevel}.
                    //         8. Questions must be unique and challenging.
                    //         9. Always validate output before sending.

                    //         Your response must be only the JSON array.

                    //         you have to give the response in the form of json object like [
                    //         {
                    //             "Q.1": "What is 2+2?",
                    //             "options": [
                    //             { "a": "5" },
                    //             { "b": "8" },
                    //             { "c": "10" },
                    //             { "d": "4" }
                    //             ]
                    //         }
                    //         ]
                    //         you have to follow this pattern and you have to give the option in few word don't send larg option's length. your reponse must should be type of arrary or object
                            
                    //         `
                    // }],
                    parts:[{text:
                        `Act like a strict interviewer.
                        You have to ask MCQ type question.

                        Rules for generating response:

                        1. You must always respond only in valid JSON array format.

                        2. Each question should follow this structure:
                        [
                        {
                            "Q.1": "Your question here?",
                            "options": [
                            { "a": "option1" },
                            { "b": "option2" },
                            { "c": "option3" },
                            { "d": "option4" }
                            ]
                        }
                        ]

                        3. The option value must be very short — maximum 2-3 words only.

                        4. Escape inner double quotes like this: \".

                        5. Do not add any explanation, description, or extra text.

                        6. Generate exactly ${question} number of questions on the topic: ${topic}.

                        7. Difficulty Level: ${difficultyLevel}

                        8. Rules for Difficulty:
                        - If difficulty level is "easy" — generate simple basic questions.
                        - If difficulty level is "medium" — generate moderately tricky questions.
                        - If difficulty level is "hard" or above — generate very difficult and uncommon questions that are not easy to guess.

                        9. All questions must be unique and different from each other.

                        10. Validate your output strictly before sending.
                        
                        11. Everytime you have give tottaly different question as comparision previous question 

                        Important:
                        > If you generate invalid JSON or break any rule — your response will be rejected.
                        - Do not include explanations or extra messages in the output.
                        Your response must only be a valid JSON array. No extra text or notes.

                        ---

                        Example of valid response format:
                        [
                        {
                            "Q.1": "What is 2+2?",
                            "options": [
                            { "a": "5" },
                            { "b": "8" },
                            { "c": "10" },
                            { "d": "4" }
                            ]
                        }
                        ]

                        ---

                        User Input:
                        > Topic: ${topic}  
                        > Difficulty Level: ${difficultyLevel}  
                        > Number of Questions: ${question}
                        `}]
                    // generationConfig:{
                    //     maxOutputTokens: 100000,
                    // }
                }]
            })
            return response.text
        }
        let response = await main()
        const parseJson = JSON.stringify(response,null,2)
        res.status(200).json({
            finalAnswer:response
        })
        
        // const result = response.text

        // console.log(typeof(result))
        // console.log(result)
        // res.status(200).send(result)
    }catch(e){
        res.send("something went wrong")
        return
    }
})

const fixInvalidJSON = (data: string) => {
    let fixedData = data;
    fixedData = fixedData.replace(/```json|```/g, "");
    fixedData = fixedData.replace(/'/g, '"');
    fixedData = fixedData.replace(/(\w)"(\w)/g, '$1\\"$2');
    fixedData = fixedData.replace(/,\s*([}\]])/g, "$1");
    fixedData = fixedData.replace(/\n/g, "");
    if (fixedData.startsWith("json")) {
      fixedData = fixedData.replace("json", "").trim();
    }
    return fixedData;
  };

app.post('/submit',async function(req,res){
    let questions:any = []
    let answer:any = []

    const getQuestionFromUser = req.body.allQuestion
    const getAnswerFromUser = req.body.allAnswer
    
    for(let i = 0;i<getQuestionFromUser.length;i++){
        questions.push(getQuestionFromUser[i])
        answer.push(getAnswerFromUser[i])
    }
    let totallCorrectAnswer:any = 0;
    async function checkResult(){
        const response = await ai.models.generateContent({
            model:"gemini-1.5-flash",
            contents:[{
                role:"user",
                parts:[{text:`{
                        You are given two arrays:


                        1. 'question' - an array of questions in string format. Question can be anything 
                        2. 'answer' - an array of answers corresponding to each question.

                        Your task is to evaluate each question and check if the provided answer is correct.

                        Rules (strictly follow this):
                        - Evaluate each question yourself (e.g., solve "what is 2+2").
                        - Compare the result with the corresponding value in the 'answer' array.
                        - If the answer is correct, return true; if incorrect, return false.
                        - Your final output should be a JSON object that includes:
                        - 'response': an array of booleans (true/false), one for each question.
                        - 'totalCorrect': an integer representing how many answers were correct.

                        Important:
                        - The length of the 'response' array must exactly match the length of the 'question' array.
                        - Only provide the response in the required JSON format.
                        - Do not include explanations or extra messages in the output.
                        - you have to give the give the response 100% accurate. This is most important based on your response i will marks out the students so please don't make any mistake
                        - you have to act like an examminar

                        Example input:
                        {
                        "question": ["what is 2+2", "what is 3+3", "what is 2*5"],
                        "answer": [4, 6, 20]
                        }
                        answer of questoin[0] is answer[0] something like this for all elements
                        Expected output:
                        {
                        "response": [true, true, false],
                        "totalCorrect": 2
                        }
                        you have to apply alll the example to this given question and given answer
                        here is your question ${questions}
                        here is your answer ${answer}


                    `}]
                }],
                
        })
        return response.text
    }


    const response = await checkResult()
    let nextTotal :any = 0
    if(!response){
        console.log("response is empty")

        return
    }

    // const vaildResponse = response.replace(/'/g, '"');
    // const parseData = JSON.parse(vaildResponse)
    const vaildStr = fixInvalidJSON(response)
    const paresdStr = JSON.parse(vaildStr)
    console.log(paresdStr.response)
    // const newResponse = 
    const convertedArray = paresdStr.response.map(Boolean)
    console.log(typeof(convertedArray[0]))
    for(let i = 0 ; i<paresdStr.response.length; i++){
        if(paresdStr.response[i]){
            nextTotal= nextTotal+1
        }
    }
    // console.log(questions)
    // console.log(response)
    console.log(typeof(paresdStr.response[0]))
    console.log(nextTotal)
    res.json({
        questions:questions,
        answer : response,
        numebrOfQueston : questions.length,
        CorrectAnswer : totallCorrectAnswer
    })
})

app.listen(3002,()=>{
    console.log("server is running or port 3002")
})




