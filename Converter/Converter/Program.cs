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
            var data = questionnaires.GetJavaScriptData();
            File.WriteAllLines(@"d:\questdata.js", data);
            //var quest = new Questionnaire(@"D:\Work\Exam\data\Chapter 03.txt");
        }
    }
}
