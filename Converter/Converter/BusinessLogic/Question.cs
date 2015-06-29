using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Converter.BusinessLogic
{
    public class Question
    {
        public string NumberText { get; set; }
        public string QuestionText { get; set; }
        public string Explanation { get; private set; }
        public List<Answer> Answers { get; private set; }

        public Question()
        {
            Answers = new List<Answer>();
        }

        public void SetCorrectAnswer(string numberText)
        {
            var answer = Answers.FirstOrDefault(a => a.NumberText == numberText);
            if (answer == null)
                throw new Exception("Answer is not found: " + numberText);
            answer.IsCorrect = true;
        }

        public void AddAnswer(string numberText, string answerText)
        {
            Answers.Add(new Answer
                        {
                            NumberText = numberText,
                            AnswerText = answerText,
                            IsCorrect = false
                        });
        }

        public void AddExplanation(string explanation)
        {
            Explanation = explanation;
        }
    }
}
