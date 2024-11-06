class InvalidFileExtensionError(Exception):
    def __init__(self, filename, extension):
        self.filename = filename
        self.extension = extension
        super(f"Invalid extension {extension} in file '{filename}'")
        
class InvalidTestTypeError(Exception):
    def __init__(self, testType: str):
        super(f"Invalid test type {testType}")
