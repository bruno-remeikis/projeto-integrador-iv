class StringBuilder:
    def __init__(self, str: str = ''):
        self.str = str
        
    # ln = append line
    def ln(self, str: str = '', condition: bool = True, breaks: int = 1):
        if (condition):
            self.str += str + ('\n' * breaks)
        return self
    
    def toString(self):
        return self.str