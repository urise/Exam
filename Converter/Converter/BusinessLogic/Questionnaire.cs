using System;
using System.CodeDom;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Converter.BusinessLogic
{
    public class Questionnaire
    {
        private string _questionnaireName;
        public string QuestionnaireName { get { return _questionnaireName; } }
        private List<Question> _questions = new List<Question>();

        public Questionnaire(string fileName)
        {
            var lines = File.ReadAllLines(fileName);
            _questionnaireName = Path.GetFileNameWithoutExtension(fileName);
            Initialize(lines);
        }

        private static bool IsNumber(string numberText)
        {
            int n;
            return int.TryParse(numberText, out n);
        }

        private Question GetQuestionByNumber(string numberText)
        {
            return _questions.FirstOrDefault(q => q.NumberText == numberText);
        }

        private void Initialize(IEnumerable<string> lines)
        {
            Question question = null;
            bool isNewQuestion = false;
            foreach (var line in lines.Select(s => s.Replace("'", "`")))
            {
                if (string.IsNullOrEmpty(line.Trim())) continue;
                
                if (line.StartsWith("Explanation "))
                {
                    var explanation = line.Substring("Explanation ".Length);
                    if (question == null)
                        throw new Exception("Line is illegal: " + line);
                    question.AddExplanation(explanation);
                    continue;
                }
                var pointIndex = line.IndexOf('.');
                if (pointIndex == -1)
                    throw new Exception("Line is illegal: " + line);
                var numberText = line.Substring(0, pointIndex).Trim();
                var text = line.Substring(pointIndex + 1).Trim();
                if (IsNumber(numberText))
                {
                    question = GetQuestionByNumber(numberText);
                    if (question == null)
                    {
                        isNewQuestion = true;
                        question = new Question
                                   {
                                       NumberText = numberText,
                                       QuestionText = text
                                   };
                        _questions.Add(question);
                    }
                    else
                    {
                        isNewQuestion = false;
                        var words = text.Split(' ');
                        if (words.Length != 2 || words[0] != "Answer")
                            throw new Exception("Line is illegal: " + line);
                        question.SetCorrectAnswer(words[1]);
                    }
                }
                else
                {
                    if (question == null)
                        throw new Exception("Line is illegal: " + line);
                    if (isNewQuestion) question.AddAnswer(numberText, text);
                }
            }
        }

        public List<string> GetJavaScriptData()
        {
            var lines = new List<string>();
            lines.Add("\t{");
            lines.Add("\t\ttitle: '" + _questionnaireName + "',");
            lines.Add("\t\tquestions: [");
            foreach (var question in _questions)
            {
                lines.Add("\t\t\t{\tquestion: '" + question.QuestionText + "',");
                lines.Add("\t\t\t\texplanation: '" + question.Explanation + "',");
                lines.Add("\t\t\t\tanswers: [");
                foreach (var answer in question.Answers)
                {
                    if (answer.IsCorrect)
                        lines.Add("\t\t\t\t\t{ answer: '" + answer.AnswerText + "', correct: true },");
                    else
                        lines.Add("\t\t\t\t\t{ answer: '" + answer.AnswerText + "' },");
                }
                lines.Add("\t\t\t\t]");
                lines.Add("\t\t\t},");
            }
            lines.Add("\t\t]");
            lines.Add("\t},");
            return lines;
        }

        public void TestData()
        {
            var n = 1;
            foreach (var question in _questions)
            {
                question.TestData();
                if (question.NumberText != n.ToString())
                    throw new Exception("Wrong number of question: " + question.QuestionText);
                n++;
            }
        }
    }
}
