from abc import ABC, abstractmethod

class AiManager(ABC):
    @abstractmethod
    def ask(self, question: str) -> str:
        pass