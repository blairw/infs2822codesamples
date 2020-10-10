import pandas as pd
import pandasql as ps
import numpy as np
import matplotlib.dates as mdates

# Part 1
df_covid_data = pd.read_csv('owid-covid-data.csv')

df_subset = ps.sqldf(
    "SELECT date, location, total_cases"
    + " FROM df_covid_data"
    + " WHERE location IN ('Argentina', 'Spain') AND total_cases > 0"
    + " ORDER BY date ASC, location ASC"
)

df_subset.to_csv('df_subset.csv')



# # CHECKING ONLY
# df_subset = pd.read_csv('df_subset.csv')
# df_check = ps.sqldf(
#     "SELECT x.date, x.total_cases, y.total_cases"
#     + " FROM (SELECT * FROM df_subset WHERE location = 'Argentina') x"
#     + " JOIN (SELECT * FROM df_subset WHERE location = 'Spain') y"
#     + " ON x.date = y.date"
# )
# df_check.to_csv('df_check.csv')




# Part 2
import seaborn as sns

df_subset = pd.read_csv('df_subset.csv')
# df_subset = df_subset.drop(df_subset[df_subset.date < '2020-02-01'].index)
df_subset = ps.sqldf(
    "SELECT * FROM df_subset WHERE total_cases > 0"
)
df_subset['date'] = pd.to_datetime(df_subset['date'])

sb_lineplot = sns.lineplot(x='date', y='total_cases', hue='location', markers=True, data=df_subset)
sb_lineplot.set_title("COVID-19 cases: Argentina and Spain")

sb_figure = sb_lineplot.get_figure()
sb_figure.autofmt_xdate()
sb_figure.savefig('file.pdf')