using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Converter.BusinessLogic;

namespace Converter
{
    class Program
    {
        static void Main(string[] args)
        {
            var questionnaires = new QuestionnaireList(@"D:\Work\Exam\data");
            questionnaires.TestData();
            var data = questionnaires.GetJavaScriptData();
            
            File.WriteAllLines(@"D:\Work\Exam\js\questdata.js", data);
            Console.ReadLine();
            //var quest = new Questionnaire(@"D:\Work\Exam\data\Chapter 03.txt");
        }
    }
}
