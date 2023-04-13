const hangmanObject = {
    alphabet: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"],
    parentDiv: document.querySelector('.alphabet'),
    questionDiv: document.querySelector('.question'),
    answerDiv: document.querySelector('.answer'),
    healthDiv: document.querySelector('.health'),
    answersDivArr: [],
    correctAnswer: 0,
    questionIndex: 0,
    answer: '',
    health: 10,

    quiz: [
        { question: 'What item would get wet whilst drying?', answer: 'towel' },
        { question: 'The more we take the more we leave behind – What are they?', answer: 'footsteps' },
        { question: 'What has a head and a tail but no arms or legs?', answer: 'coin' },
        { question: 'What’s something that’s easy to see but hard to look at?', answer: 'sun' },
        { question: 'What flies without wings?', answer: 'time' },
        { question: 'What goes up but never comes down?', answer: 'age' },
        { question: 'I am easy to lift but hard to throw. What am I?', answer: 'feather' },
        { question: 'You answer me, although I never ask you questions. What am I?', answer: 'phone' },
        { question: 'What part of elephant is as big as an elephant, but weighs nothing at all?', answer: 'shadow' },
        { question: 'What can fill an entire room without taking up any space?', answer: 'light' },
        { question: 'What English word has three consecutive double letters?', answer: 'bookkeeper' },
        { question: 'What building has the most stories?', answer: 'library' },
        { question: 'The more there is, the less you see. What am I?', answer: 'darkness' },
        { question: 'What grows when it eats, but dies when it drinks?', answer: 'fire' },
        { question: 'I make two people out of one. What am I?', answer: 'mirror' },
        { question: 'What has no beginning, end, or middle?', answer: 'doughnut' },
        { question: 'What has 88 keys but could never open a door?', answer: 'piano' },
        { question: 'What occurs once in a minute, twice in a moment, and never in 1,000 years?', answer: 'm' },
        { question: 'I am an odd number. Take away one letter and I’m even. What number am I?', answer: 'seven' },
        { question: 'What is harder to catch the faster you run?', answer: 'breath' },
    ],

    generateLetters() {
        let alphabetDivs = [];
        this.alphabet.forEach(letter => {
            let letterDiv = document.createElement('div');
            letterDiv.className = 'letter-div';
            letterDiv.textContent = letter;
            alphabetDivs.push(letterDiv);
            this.parentDiv.appendChild(letterDiv);
        });
        if (this.questionIndex === this.quiz.length) {
            alert('We have a winner!');
            return;
        }
        this.generateAnswer(this.questionIndex, alphabetDivs);
        this.generateHealth(this.health);
    },

    generateAnswer(index, letterDivs) {
        this.questionDiv.textContent = this.quiz[index].question;
        let answerArr = Array.from(this.quiz[index].answer);
        let answerCount = this.quiz[index].answer.length;
        answerArr.forEach(answerLetter => {
            let letterDiv = document.createElement('div');
            letterDiv.className = 'letter-div hidden-answer';
            letterDiv.textContent = answerLetter;
            this.answersDivArr.push(letterDiv);
            this.answerDiv.appendChild(letterDiv);
        });

        onkeyup = (key) => {
            this.checkAnswer(key.key, index, this.answersDivArr, answerCount);
        };

        if (letterDivs) {
            letterDivs.forEach(letter => {
                letter.onclick = () => this.checkAnswer(letter.textContent, index, this.answersDivArr, answerCount);
            });
        }
    },

    generateHealth(hp) {
        this.healthDiv.textContent = `${hp} Lives`;
        if (hp === 0) {
            setTimeout(() => {
                alert('You Lost, game will start over');
                location.reload();
            }, 10);
        }
    },

    checkAnswer(key, index, arr, answerCount) {
        let letterIndex = this.quiz[index].answer.indexOf(key);
        if (letterIndex != -1) {
            arr.forEach(letterDiv => {
                if (letterDiv.textContent == key) {
                    if (letterDiv.classList.contains('hidden-answer')) {
                        this.correctAnswer++;
                        letterDiv.classList.remove('hidden-answer');
                    }
                }
                setTimeout(() => {
                    if (answerCount === this.correctAnswer) {
                        this.clearPlayField();
                        this.generateLetters();
                        this.generateHealth(this.health += 3);
                    }
                }, 10);
            });
        } else {
            this.generateHealth(this.health -= 1);
        }
    },

    clearPlayField() {
        this.answerDiv.innerHTML = '';
        this.answersDivArr = [];
        this.questionIndex += 1;
        this.parentDiv.innerHTML = '';
        this.correctAnswer = 0;
    },
};

hangmanObject.generateLetters();