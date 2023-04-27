from datetime import datetime, timedelta
import random as rd
import numpy as np
import pandas as pd
import matplotlib.dates as mdates
import matplotlib
import matplotlib.pyplot as plt
from scipy.interpolate import make_interp_spline, BSpline
from scipy.ndimage import gaussian_filter1d
from sklearn.linear_model import LinearRegression

"""
Zmienne niezależne od pory dnia, ustalane przed jego rozpoczęciem:

    Environment -   Czynniki zewnętrzne takie jak temperatura, wilgotność, oświetlenie, skumulowane w jedną statystykę,
                    losowane codziennie w obrębie 45 - 65.
    
    Work duration - Czas pracy, przyjęte zmiany 7 - 9h. Z każdą godziną pracy baza zmęczenia rośnie. Losowane codziennie.
    Sleep score   - Długość i jakość snu w jednej statystyce. Losowane codziennie w obrębie 4 - 10.
    
    Personal fatigue - Podatność na zmęczenie w trakcie pracy. Ustalana jednorazowo dla osoby. Przedział 0.5 - 1.
                       Składają się na nie takie czynniki jak wiek, płeć, osobowość. W celu uproszczenia modelu
                       skumulowane w jedną statystykę.
"""

"""
https://journals.plos.org/plosone/article/figure?id=10.1371/journal.pone.0239984.g001
https://www.nature.com/articles/srep10113
https://www.semanticscholar.org/paper/A-Study-of-the-Reduction-of-Fatigue-Impact-on-Rest-Janaro-Bechtold/6c47920d9d48aa12d90426cdf6f11f66b8aeaa63
https://link.springer.com/article/10.1007/s00508-021-01949-1
"""


def yawning_probability(start_time, end_time, current_time):
    elapsed_minutes = (current_time - start_time).total_seconds() / 60
    shift_progress = elapsed_minutes / (8 * 60)
    yawning_prob = 0.088 * shift_progress ** 2 - 0.078 * shift_progress + 0.03
    yawning_prob *= rd.uniform(0.8, 1.2)
    yawning_prob = max(0, min(1, yawning_prob))

    return yawning_prob


def generate_mock_data():
    with open("mock_data.txt", "a") as f:
        mock_data = []
        current_date = '01/01/22 08:00:00'
        current_date = datetime.strptime(current_date, '%m/%d/%y %H:%M:%S')
        final_date = '12/30/22 22:00:00'
        final_date = datetime.strptime(final_date, '%m/%d/%y %H:%M:%S')
        while current_date <= final_date:
            if current_date.weekday()<5:
                day_data = []
                print(current_date)
                yawns = 0
                sleeps = 0
                work_duration = rd.randint(7, 9)
                start_hour = rd.randint(7, 9)
                finish_hour = start_hour + work_duration
                start_time = current_date.replace(hour=start_hour)
                finish_time = current_date.replace(hour=finish_hour)
                start_time_ts = int(datetime.timestamp(start_time))
                finish_time_ts = int(datetime.timestamp(finish_time))
                for current_time in range(start_time_ts, finish_time_ts + 1, 30):
                    diff_y = 0
                    diff_s = 0
                    if rd.random() < yawning_probability(start_time, finish_time, datetime.fromtimestamp(current_time)):
                        if rd.randint(0, 1):
                            yawns += 1
                            diff_y = 1
                        else:
                            sleeps += 1
                            diff_s = 1
                    f.write(f"{datetime.fromtimestamp(current_time)}, {yawns}, {sleeps}, {diff_y}, {diff_s}\n")
                mock_data.append(day_data)
            current_date = current_date + timedelta(days=1)
            print(mock_data)


def show_data():
    fatigue = 0.5
    fatigue_shift = -0.012
    fatigue_sustain = 0
    fatigue_history = []
    fatigue_shift_history = []

    def calculate_shift(shift):
        return max(-0.005, min(shift + fatigue_sustain / 10, 0.03)) + fatigue_sustain / 10

    def calculate(fat, shift):
        return max(0, min(fat * (1 + shift), 1))

    x = []
    y1 = []
    y2 = []

    # Step 3
    with open('mock_data.txt', 'r') as f:
        for line in f:

            data = line.strip().split(', ')
            dt = datetime.strptime(data[0], '%Y-%m-%d %H:%M:%S')
            if dt.day == 7 and dt.month == 2:

                x.append(dt)
                try:
                    # print(y1[-1])
                    if y1[-1] - y1[-2] >= 1:
                        fatigue_sustain += 2
                        fatigue_shift = calculate_shift(fatigue_shift)
                        fatigue_sustain -= 1.2
                        # print(f"diff: {y1[-1]} - {y1[-2]} = 1")
                    if y2[-1] - y2[-2] >= 1:
                        fatigue_sustain += 3
                        fatigue_shift = calculate_shift(fatigue_shift)
                        fatigue_sustain -= 1.8

                    fatigue = calculate(fatigue, fatigue_shift)
                    fatigue_history.append(fatigue)
                    fatigue_shift_history.append(fatigue_shift)
                    fatigue_shift = calculate_shift(fatigue_shift)
                    # fatigue_history.append(fatigue)
                    # fatigue = calculate(fatigue, fatigue_shift)
                    fatigue_shift = (dt.hour / 1000) * 2 - 0.035
                    y1.append(int(data[1]))
                    y2.append(int(data[2]))
                except:
                    pass
                    fatigue_shift_history.append(fatigue_shift)
                    fatigue_history.append(fatigue)
                    y1.append(int(data[1]))
                    y2.append(int(data[2]))

    # Step 6
    # print(len(y1))
    # print(len(y2))
    # print(len(fatigue_history))
    # plt.plot(x, y1, label='Value 1')
    # plt.plot(x, y2, label='Value 2')
    # print(fatigue_history)

    ysmoothed = gaussian_filter1d(fatigue_history, sigma=15)

    # model = np.poly1d(np.polyfit(hours, happ, 2))

    # add fitted polynomial line to scatterplot
    # polyline = np.linspace(1, 60, 50)

    # x = mdates.date2num(x)
    # xx = np.linspace(x.min(), x.max(), 100)
    # dd = mdates.num2date(xx)
    for i in range(len(x)):
        x[i] = i
    plt.scatter(x, ysmoothed)
    model = np.poly1d(np.polyfit(x, ysmoothed,2))
    polyline = np.linspace(1, len(x), len(x))
    plt.plot(polyline, model(polyline))
    # plt.plot(polyline, model(polyline))
    plt.show()

    print(model)

    # define function to calculate r-squared
    def polyfit(x, y, degree):
        results = {}
        coeffs = np.polyfit(x, y, degree)
        p = np.poly1d(coeffs)
        # calculate r-squared
        yhat = p(x)
        ybar = np.sum(y) / len(y)
        ssreg = np.sum((yhat - ybar) ** 2)
        sstot = np.sum((y - ybar) ** 2)
        results['r_squared'] = ssreg / sstot

        return results

    # find r-squared of polynomial model with degree = 3
    print(polyfit(x, ysmoothed, 3))

    print("max" + str(max(fatigue_shift_history)))
    # plt.plot(x, ysmoothed, label='Fatigue calculated')

def calc_regression():
    regression_data = {}
    fatigue = 0.5
    fatigue_shift = -0.012
    fatigue_sustain = 0
    fatigue_history = []
    fatigue_shift_history = []

    def calculate_shift(shift):
        return max(-0.005, min(shift + fatigue_sustain / 10, 0.03)) + fatigue_sustain / 10

    def calculate(fat, shift):
        return max(0, min(fat * (1 + shift), 1))

    x = []
    y1 = []
    y2 = []

    # Step 3
    with open('mock_data.txt', 'r') as f:
        day = 3
        for line in f:

            data = line.strip().split(', ')
            dt = datetime.strptime(data[0], '%Y-%m-%d %H:%M:%S')
            if dt.day != day and dt.month<11:
                # x.append(dt)
                ysmoothed = gaussian_filter1d(fatigue_history, sigma=15)

                for i in range(len(x)):
                    x[i] = i
                plt.scatter(x, ysmoothed)
                model = np.poly1d(np.polyfit(x, ysmoothed, 2))
                polyline = np.linspace(1, len(x), len(x))
                plt.plot(polyline, model(polyline))
                # plt.plot(polyline, model(polyline))
                plt.show()

                # print(model)

                # define function to calculate r-squared
                def polyfit(x, y, degree):
                    results = {}
                    coeffs = np.polyfit(x, y, degree)
                    p = np.poly1d(coeffs)
                    # calculate r-squared
                    yhat = p(x)
                    ybar = np.sum(y) / len(y)
                    ssreg = np.sum((yhat - ybar) ** 2)
                    sstot = np.sum((y - ybar) ** 2)
                    results['r_squared'] = ssreg / sstot

                    return results

                # find r-squared of polynomial model with degree = 3

                regression_data[datetime(dt.year,dt.month,dt.day)] = [model, polyfit(x, ysmoothed, 3)]
                # print(polyfit(x, ysmoothed, 3))

                # print("max" + str(max(fatigue_shift_history)))

                fatigue = 0.5
                fatigue_shift = -0.012
                fatigue_sustain = 0
                fatigue_history = []
                fatigue_shift_history = []
                x = []
                y1 = []
                y2 = []

                day = dt.day

            x.append(dt)
            try:
                # print(y1[-1])
                if y1[-1] - y1[-2] >= 1:
                    fatigue_sustain += 2
                    fatigue_shift = calculate_shift(fatigue_shift)
                    fatigue_sustain -= 1.2
                    # print(f"diff: {y1[-1]} - {y1[-2]} = 1")
                if y2[-1] - y2[-2] >= 1:
                    fatigue_sustain += 3
                    fatigue_shift = calculate_shift(fatigue_shift)
                    fatigue_sustain -= 1.8

                fatigue = calculate(fatigue, fatigue_shift)
                fatigue_history.append(fatigue)
                fatigue_shift_history.append(fatigue_shift)
                fatigue_shift = calculate_shift(fatigue_shift)
                fatigue_shift = (dt.hour / 1000) * 2 - 0.035
                y1.append(int(data[1]))
                y2.append(int(data[2]))
            except:
                pass
                fatigue_shift_history.append(fatigue_shift)
                fatigue_history.append(fatigue)
                y1.append(int(data[1]))
                y2.append(int(data[2]))

    coefficients = []
    fitness_values = []
    for date in regression_data:
        coefficients.append(regression_data[date][0])
        fitness_values.append(regression_data[date][1]['r_squared'])

    # print(coefficients)
    X = np.array(coefficients)
    y = np.array(fitness_values)
    avg_coeff = [0,0,0]
    for entry in X:
        avg_coeff[0] += entry[0]
        avg_coeff[1] += entry[1]
        avg_coeff[2] += entry[2]

    avg_coeff[0] = avg_coeff[0]/len(X)
    avg_coeff[1] = avg_coeff[1]/len(X)
    avg_coeff[2] = avg_coeff[2]/len(X)
    print(X[0])
    # print(y)

    model = LinearRegression()
    model.fit(X, y)

    print(model.coef_)

    # Generate coefficients for a new, unknown day

    x = np.linspace(-1, 800, 100)
    print(avg_coeff)

    # Use predicted coefficients to generate y values
    y = [np.polyval(avg_coeff, i) for i in x]

    # Plot the curve
    plt.plot(x, y)
    plt.show()

    # print(coefficients)

def machine_learning():
    pass



# generate_mock_data()
calc_regression()
# show_data()
### Regression

# polynomial fit with degree = 2

