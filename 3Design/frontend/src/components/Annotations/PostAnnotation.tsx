import React from 'react'
import styles from "./Annotations.module.css";
import { DisplayedAnnotationData, RecievedAnnotationData } from '../interfaces';


interface Props{
    postBody : string,
    annotations : RecievedAnnotationData[],
    setAnnotationsVisible : (x: DisplayedAnnotationData[]) => void
}

const PostAnnotation = ({postBody, annotations, setAnnotationsVisible}: Props) => {
    const displayAnnotation = (x:RecievedAnnotationData[]) => {
        const displayedAnnotations: DisplayedAnnotationData[] = [];
        x.forEach((annotation) => {
            displayedAnnotations.push({annotatedText: postBody.slice(annotation.target.selector.start, annotation.target.selector.end), annotation: annotation.bodyValue, userId: annotation.creator.id, username: annotation.creator.nickname})
        })
        setAnnotationsVisible(displayedAnnotations);
    }
   
    const mergeAnnotations = () => {
        // Sort annotations by start index
        const sortedAnnotations = annotations.sort(
          (a, b) => a.target.selector.start - b.target.selector.start
        );
    
        const merged: any = [];
        let currentRange: any = null;
    
        sortedAnnotations.forEach((annotation) => {
          const { start, end } = annotation.target.selector;
    
          if (currentRange && start <= currentRange.end ) {
            // Expand the current range
            currentRange.end = Math.max(currentRange.end, end);
            currentRange.annotations.push(annotation);
          } else {
            currentRange = {
              start,
              end,
              annotations: [annotation],
            };
            merged.push(currentRange);
          }
        });
    
        return merged;
      };
    
      const renderText = () => {
        const mergedAnnotations = mergeAnnotations();
        const segments = [];
        let lastIndex = 0;
    
        mergedAnnotations.forEach(({ start, end, annotations } : any) => {
          // Add plain text before the annotation
          if (lastIndex < start) {
            segments.push(
              <span key={`plain-${lastIndex}`}>{postBody.slice(lastIndex, start)}</span>
            );
          }
    
          // Add highlighted annotation
          segments.push(
            <span
              key={`highlight-${start}`}
              className="highlight"
              onClick={() => {
                displayAnnotation(annotations);
              }}
              style={{ backgroundColor: 'yellow', cursor: 'pointer' }}
            >
              {postBody.slice(start, end)}
            </span>
          );
    
          lastIndex = end;
        });
    
        // Add remaining plain text
        if (lastIndex < postBody.length) {
          segments.push(
            <span key={`plain-${lastIndex}`}>{postBody.slice(lastIndex)}</span>
          );
        }
    
        return segments;
      };

    return (
        <div>
            {renderText()}
        </div>
    )
}

export default PostAnnotation