__author__ = 'apatti'
import getopt
from sys import exit,argv
from readData import getAverageQuantity,getPreviousDayErrorRate,storePredictedValue

def getQuantityValue(date,school):
    average = getAverageQuantity(date,school)
    errorRate = getPreviousDayErrorRate(date)

    prediction = average*errorRate

    storePredictedValue(date,school)

    return 0


def main(argv):
    date=''
    school=''
    try:
        opts, args = getopt.getopt(argv,"hd:s:",["date=","schoolid="])
    except getopt.GetoptError:
        print 'predictIndentQuantity.py -d <date> -s <schoolid>'
        exit(2)
    for opt, arg in opts:
        if opt == '-h':
            print 'predictIndentQuantity.py -d <date> -s <schoolid>'
            exit(2)
        elif opt in ("-d", "--date"):
            date = arg
        elif opt in ("-s", "--schoolid"):
            school = arg

    if date is '' or school is '':
        print 'predictIndentQuantity.py -d <date> -s <schoolid>'
        exit(2)

    getQuantityValue(date,school)

if __name__ == '__main__':
    main(argv[1:])