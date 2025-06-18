## TextGeometry

### TextGeometry 경계면 다듬기

TextGeometry의 bevel 속성을 활용해 경계면을 부드럽게 다듬는 방법이 있습니다

TextGeometry에서 bevel(경사면) 속성을 조절하면 두꺼운 입체 텍스트의 모서리를 자연스럽게 표현할 수 있습니다.

예를 들어, bevelThickness, bevelSize, bevelOffset, bevelSegment 값을 조정해 경사면의 두께와 부드러움을 설정할 수 있습니다.

이를 통해 입체감이 강조된 텍스트를 만들 수 있지만, 값이 너무 크면 성능 저하가 발생할 수 있으니 주의해야 합니다.

[bevel 이해하기 참고자료] - https://threejs.org/docs/#api/en/geometries/ExtrudeGeometry