import os
import shutil

# Get the current directory
current_dir = os.path.dirname(os.path.abspath(__file__))

# Define the source file and destination file name
source_file = "game_index.html"
dest_file = "index.html"

# Loop through all directories in the same directory as the script
for item in os.listdir(current_dir):
    # Check if the item is a directory
    if os.path.isdir(os.path.join(current_dir, item)):
        # Copy the source file to the destination file name in each directory
        shutil.copy(os.path.join(current_dir, source_file), os.path.join(current_dir, item, dest_file))
        print(f"Copied {source_file} to {os.path.join(current_dir, item, dest_file)}")
