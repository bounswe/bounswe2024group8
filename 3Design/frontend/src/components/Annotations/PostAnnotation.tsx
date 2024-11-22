import React from 'react'
import styles from "./Annotations.module.css";
import { DisplayedAnnotationDataList, RecievedAnnotationData } from '../interfaces';


interface Props{
    postBody : string,
    annotations : RecievedAnnotationData[],
    setAnnotationsVisible : (x: DisplayedAnnotationDataList) => void
}

const PostAnnotation = ({postBody, annotations, setAnnotationsVisible}: Props) => {
    const displayAnnotation = (x:number) => {
        const annotationEl = annotations[x];
    }
    const renderAnnotation = () => {
        let annotatedText = [];
        let lastIndex = 0;

        annotations.forEach((annotation, index) => {
            const { start, end } = annotation.target.selector;

            if (start > lastIndex) {
                annotatedText.push(
                <span key={`plain-${index}`}>
                    {postBody.slice(lastIndex, start)}
                </span>
                );
            }

            annotatedText.push(
                <span
                key={`annotation-${index}`}
                className="highlight"
                onClick={() => displayAnnotation(index)}
                style={{ backgroundColor: 'yellow', cursor: 'pointer' }}
                >
                {postBody.slice(start, end)}
                </span>
            );

            lastIndex = end;
        });

        if (lastIndex < postBody.length) {
            annotatedText.push(
                <span key="remaining">{postBody.slice(lastIndex)}</span>
            );
        }

        return annotatedText;
    }

    return (
        <div>
            {renderAnnotation()}
        </div>
    )
}

export default PostAnnotation