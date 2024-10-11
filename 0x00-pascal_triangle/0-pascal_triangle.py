#!/usr/bin/python3

"""
Module 0-pascal_triangle
"""

def pascal_triangle(n):
    """
    Returns a list of lists of integers representing Pascal's triangle of n.
    Args:
        n (int): The number of rows of Pascal's triangle to generate.
    Returns:
        list of lists of integers: Pascal's triangle up to the nth row.
    """
    # If n is less than or equal to 0, return an empty list
    if n <= 0:
        return []

    # Initialize the triangle with the first row
    triangle = [[1]]

    # Generate the rows of the triangle
    for i in range(n - 1):
        # Create a temporary list with 0s at both ends of the last row
        temp = [0] + triangle[-1] + [0]
        
        # Initialize the new row
        row = []
        
        # Calculate the elements of the new row
        for j in range(len(triangle[-1]) + 1):
            row.append(temp[j] + temp[j + 1])
        
        # Append the new row to the triangle
        triangle.append(row)

    return triangle