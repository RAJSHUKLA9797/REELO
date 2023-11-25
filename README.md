# REELO

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/rajshukla9797/REELO.git
cd REELO
npm install
node seeds/index_seeds.js
node server.js
```
Now the server is live, Open POSTMAN or any other app and send POST requests to route `/generate` in the below format
```
{
    "marks":<+ve Integer>,
    "easy":<+ve Integer>,
    "medium":<+ve Integer>,
    "hard":<+ve Integer>
}
```
Make sure that the sum of fields `easy`, `medium` and `hard` is equal to the field `marks`.
If a question set is not possible with the given distribution the API returns the following message:
`couldnt form an appropriate paper with the given distribution, try changing the distribution`

We can also add topic separation if required, for that we just need to call the function `separator` with inputs `questionSet, topic, <name_of_topic>` inside the POST route `/generate`'s function and afere that make a separation based on `difficulty`.
