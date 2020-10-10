import pandas as pd
import seaborn as sns

# https://ourworldindata.org/coronavirus-source-data
# https://seaborn.pydata.org/generated/seaborn.lineplot.html
# https://pandas.pydata.org/docs/reference/frame.html
# https://stackoverflow.com/questions/32244753/how-to-save-a-seaborn-plot-into-a-file


df = pd.read_csv('owid-covid-data.csv')
df = df[['location', 'date', 'total_cases']]
sns_plot = sns.lineplot(data=df, x='date', y='total_cases', hue='location')
sns_plot.figure.savefig('output.png')