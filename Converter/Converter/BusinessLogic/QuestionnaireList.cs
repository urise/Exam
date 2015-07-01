using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Converter.BusinessLogic
{
    public class QuestionnaireList
    {
        private readonly List<Questionnaire> _questionnaires = new List<Questionnaire>();

        public QuestionnaireList(string directory)
        {
            var files = Directory.GetFiles(directory);
            foreach (var file in files)
            {
                var questionnaire = new Questionnaire(file);
                _questionnaires.Add(questionnaire);
            }
        }

        public List<string> GetJavaScriptData()
        {
            var lines = new List<string>();
            lines.Add("window.questionnaires = [");
            foreach (var questionnaire in _questionnaires)
            {
                lines.AddRange(questionnaire.GetJavaScriptData());
            }
            lines.Add("];");
            return lines;
        }

        public void TestData()
        {
            var n = 1;
            foreach (var questionnaire in _questionnaires)
            {
                Console.WriteLine(n.ToString() + ". " + questionnaire.QuestionnaireName + " ...");
                n++;
                questionnaire.TestData();
            }
            Console.WriteLine("Completed.");
        }
    }
}
