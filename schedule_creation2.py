import csv 
import pprint
import json

pp = pprint.PrettyPrinter(indent=2)
FILENAME = 'datasetfinal.csv'

with open(FILENAME, "a") as myfile:
    myfile.write('\n,END,END,,,,,,,,,,,')

def create_dictionaries():
    students = []
    with open(FILENAME) as f:
        reader = csv.reader(f)
        
        #this works under the assumption that student names are grouped together
        prevID = ""
        current_dict = {}
        for row in reader:
            fname = row[1]
            lname = row[2]
            grade = row[10]
            last_line = fname == "END" and lname == "END"
            currentID = "{}{}{}".format(fname,lname,grade)
            if currentID != prevID or last_line:
                students.append(current_dict)
                current_dict = {
                    "id": "{} {} {}".format(fname,lname,grade),
                    "firstname":fname,
                    "lastname":lname,
                    "grade":grade,
                    "schedule":{}
                }
            grade_letters = row[6].split(",")
            for grade_letter in grade_letters:
                per = "per"+grade_letter
                current_dict["schedule"][per] = {
                    "teacher":row[7],
                    "subject":row[3]
                }
            prevID = currentID
    
    #skip first two entries which are {} and the header row
    students = students[2:]
            
    # for x in range(10):
    #     pp.pprint(students[x])
    return students

data = create_dictionaries()
with open('data.json', 'w') as out:
    json.dump(data, out, sort_keys=True, indent=4, separators=(',', ': '))

#verify no two students with same ID
verify = {}
for student in data:
    studentID = student['firstname'] + student['lastname'] + student['grade']
    if studentID in verify:
        print("found duplicate, breaking: {}".format(studentID))
        break
    else:
        verify[studentID] = 1
else:
    print("all verified, no duplicates")