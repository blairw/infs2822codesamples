import numpy as np
import pandas as pd
import pandasql as ps

df_covid_data = pd.read_csv('owid-covid-data.csv')


#
# ------ SIMPLE DEMOS -------
#

# # Demo 1 - data imported successfully
# print(df_covid_data)


# # Demo 2 - no. of countries
# df_outcome1 = ps.sqldf("SELECT DISTINCT location FROM df_covid_data")
# print(df_outcome1)
# df_outcome1.to_csv("OUTPUT_df_outcome1.csv")


# Demo 3 - confirm dates
# df_outcome2 = ps.sqldf("SELECT location, MAX(date) as max_date FROM df_covid_data GROUP BY location")
# print(df_outcome2)
# df_outcome2.to_csv("OUTPUT_df_outcome2.csv")



#
# ------ CREATE PAIRINGS FOR STUDENTS -------
#

# Demo 4 - confirm cases
df_outcome3 = ps.sqldf(
    "SELECT location, MAX(total_cases) AS max_cases, date"
    + " FROM df_covid_data GROUP BY location"
    + " HAVING location != 'World'"
    + " ORDER BY 2 DESC"
)
# print(df_outcome3)
# df_outcome3.to_csv("OUTPUT_df_outcome3.csv")


# Demo 5 - requires demo 4 - create pairings
list_country_pairs = []
for index, row in df_outcome3.iterrows():
    # print(index % 2)
    if index % 2 == 0:
        this_dictionary = {"student": "", "country1": "", "country2": ""}
        this_dictionary["country1"] = row['location']
        list_country_pairs.append(this_dictionary)
    else:
        list_country_pairs[len(list_country_pairs) - 1]["country2"] = row['location']

# # -- To show that country pairs are created! ---
# for this_dictionary in list_country_pairs:
#     print(this_dictionary)


# # Demo 6 - requires demo 4 and 5 - assign students
df_students_m18a = pd.read_csv('student-data/students_m18a.csv')

## -- To show that students are shuffled --
# print(df_students_m18a)
np.random.shuffle(df_students_m18a.values)

# # # -- To show that students are shuffled --
# print(df_students_m18a)

df_students_t16a = pd.read_csv('student-data/students_t16a.csv')
np.random.shuffle(df_students_t16a.values)

list_m18a_allocations, list_t16a_allocations = [], []

# Generate M18A
for index, row in df_students_m18a.iterrows():
    list_m18a_allocations.append(list_country_pairs[index])
    list_m18a_allocations[index]["student"] = row["fname"] + " " + row["lname"]

df_m18a = pd.DataFrame.from_records(list_m18a_allocations)
df_m18a.to_csv('OUTPUT_M18A_Allocations.csv')

# Generate T16A
for index, row in df_students_t16a.iterrows():
    list_t16a_allocations.append(list_country_pairs[index])
    list_t16a_allocations[index]["student"] = row["fname"] + " " + row["lname"]

df_t16a = pd.DataFrame(list_t16a_allocations)
df_t16a.to_csv('OUTPUT_T16A_Allocations.csv')