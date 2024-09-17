class InvalidFileExtensionError(Exception):
    def __init__(self, filename, extension):
        self.filename = filename
        self.extension = extension
        super().__init__(f"Invalid extension {extension} in file '{filename}'")