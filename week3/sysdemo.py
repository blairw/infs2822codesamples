import sys

print('-- sys.argv --')
print(sys.argv)

print()

print('-- sys.stdin --')
if not sys.stdin.isatty():
    for line in sys.stdin:
        print(line, end="")
    print()
else:
    print('(is blank)')