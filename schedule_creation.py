import csv 

test_data = ',Asif,Uddin,English 11,,English 11,C,"Davenport, Lauren",,,11,,,\n'',Asif,Uddin,Chemistry,,Chemistry,D,"Gayatinea, Ms",,,11,,,'

def create_dictionaries():
    with open('datasetfinal.csv') as f:
        reader = csv.reader(f)
        student_schedule = {
                                "firstname": "",
                                "lastname": "",
                                "grade": "",
                                "schedule": {}   
}
         
        for row in reader:
            test_dictionary = {"fname":"", "lname":"", "class": "", "period" : "", "teacher": ""} 
            test_dictionary['fname'] = row[1]
            test_dictionary['lname'] = row[2]
            test_dictionary['class'] = row[3]
            per = "per"+row[6]
            student_schedule["schedule"][per] = {
                "teacher":row[7],
                "subject":row[3]
            } 
            test_dictionary['teacher'] = row[7]
            student_schedule['grade'] = row[10]
            print (test_dictionary)
            if  student_schedule["firstname"] == "":
                student_schedule["firstname"] = test_dictionary["fname"]
            if student_schedule["lastname"] == "":
                student_schedule["lastname"] = test_dictionary["lname"]
            if student_schedule["grade"] == "":
                student_schedule["grade"] = test_dictionary["grade"]
        
        print (student_schedule)

create_dictionaries()
