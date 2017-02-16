import json,sys
from pprint import pprint

with open('data.json') as f:
    class_list = []
    data = json.load(f)
    # pprint(data[0])
    for student in data:
        for period in student['schedule']:
            class_name = student['schedule'][period]['subject']
            teacher = student['schedule'][period]['teacher']
            if (class_name+teacher) not in class_list:
                class_list.append(class_name+teacher)
    
    for i in range(len(class_list)-1):
        for j in range(i+1,len(class_list)):
            if class_list[i] == class_list[j]:
                print("Dupe: {}".format(class_list[i]))
                print("Found duplicate, exiting.  No data written.")
                sys.exit()
                
    directory = []
    for c in class_list:
        directory.append({c:""})

    with open('directory.json','w') as out:
        json.dump(directory, out, sort_keys=True, indent=4, separators=(',', ': '))


print("success, done")