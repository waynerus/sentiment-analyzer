from flask import *
import pandas as pd
app = Flask(__name__)

@app.route("/tables")
def show_tables(pdframe):
    #data = pd.read_excel('dummy_data.xlsx')
    #data.set_index(['Name'], inplace=True)
    #data.index.name=None
    #females = data.loc[data.Gender=='f']
    #males = data.loc[data.Gender=='m']
    return render_template('view.html',tables=[pdframe.to_html()])

if __name__ == "__main__":
    app.run(debug=True)
