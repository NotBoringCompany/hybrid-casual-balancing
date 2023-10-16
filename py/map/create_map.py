import pygame
import sys
from boundary import get_map_boundary

# Initialize Pygame
pygame.init()

# Define the screen dimensions
map_width = 1024
map_height = 1024
tile_size = 1  # Adjust this to set the size of each tile

# Calculate the screen dimensions based on the map size and tile size
screen_width = map_width * tile_size
screen_height = map_height * tile_size

# Create the Pygame screen
screen = pygame.display.set_mode((screen_width, screen_height))

map_points = get_map_boundary()

scaled_polygon_points = [(x * tile_size, y * tile_size) for x, y in map_points]

# Set the polygon color
polygon_color = (0, 0, 255)  # Blue color (R, G, B)

# Main game loop
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Clear the screen
    screen.fill((255, 255, 255))  # White background color

    # Draw the map grid (optional)
    for x in range(0, screen_width, tile_size):
        pygame.draw.line(screen, (0, 0, 0), (x, 0), (x, screen_height), 1)
    for y in range(0, screen_height, tile_size):
        pygame.draw.line(screen, (0, 0, 0), (0, y), (screen_width, y), 1)

    # Draw the polygon
    pygame.draw.polygon(screen, polygon_color, scaled_polygon_points, 2)  # 2 is the line width

    # Update the display
    pygame.display.flip()

# Quit Pygame
pygame.quit()

# Exit the program
sys.exit()