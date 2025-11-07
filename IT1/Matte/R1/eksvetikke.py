from math import *

def f(x):
    return 2*x**2 + x - 5

x = 1
delta_x = 1e-8

fder = (f(x + delta_x) - f(x) ) / delta_x

print(fder)


# 3.57


