from math import *  

x_1 = 1
x_2 = 1.000000000002
def f(x):
    return x**2 * exp(x)

gjennomsnittlig_vekstfart = (f(x_2) - f(x_1)) / (x_2 - x_1)

print(gjennomsnittlig_vekstfart)
