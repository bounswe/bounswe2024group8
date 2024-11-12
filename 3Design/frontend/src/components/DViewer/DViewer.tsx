import React, { useEffect, useRef, useState } from 'react'
import * as OV from "online-3d-viewer"
import styles from "./DViewer.module.css"
import { CircularProgress } from '@mui/material'
import { Spin } from 'antd'
interface Props{
    filePath: string
}

const loadingStyle: React.CSSProperties = {
    padding: 50,
    borderRadius: 4,
  };
  
  const loading = <div style={loadingStyle} />;

const DViewer = ({filePath}: Props) => {
    const divRef = useRef<HTMLDivElement | null>(null);
    const viewerRef = useRef<OV.EmbeddedViewer | null>(null);
    const [modelLoading, setModelLoading] = useState(true);
    useEffect(() => {
        let parentDiv = divRef.current;

        if (viewerRef.current != null){
            return;
        }

        let viewer = new OV.EmbeddedViewer (parentDiv!, {
        camera: new OV.Camera(
            new OV.Coord3D(-150.0, 200.0, 300.0),
            new OV.Coord3D(0.0, 0.0, 0.0),
            new OV.Coord3D(0.0, 1.0, 0.0),
            45.0
        ),
        backgroundColor: new OV.RGBAColor(255, 255, 255, 255),
        defaultColor: new OV.RGBColor(0, 100, 100),
        edgeSettings : new OV.EdgeSettings (false, new OV.RGBColor (0, 0, 0), 1),
        
        });

        viewerRef.current = viewer
        // load a model providing model urls
        viewer.LoadModelFromUrlList([
            filePath
        ]);
        const checkModelLoad = setInterval(() => {
            if (viewer.GetModel()) {
                setModelLoading(false);
                clearInterval(checkModelLoad); 
            }
        }, 100);
        
        return () => {
            // ! We need to correctly clean up our viewer, it's listeners and related model data to ensure memory leaks don't occur
            // ! If you want to see what can happen if this isn't here, comment out this code and repeatedly spin up multiple viewers and then do a heap snapshot with chrome and you will see a massive amount of data that isn't being cleaned up by the garbage collector
            // We first check that both the viewerRef and parentDiv aren't null so we don't call a method on an object that doesn't exist
            if (viewerRef.current !== null && divRef.current !== null) {
                // ! I threw the kitchen sink at this to get rid of the memory leaks so some of this code is definitely redundant and there is likely a cleaner way of doing this
                // We delete the model, reset the state of the renderer and clear the viewer
                delete viewerRef.current.model;
                viewerRef.current.viewer.renderer.resetState();
                viewerRef.current.viewer.Clear();
                // Then we delete the whole viewer object
                //delete viewerRef.current.viewer;

                // We grab canvas element before we delete it to ensure we lose the webgl context and it doesn't persist
                const gl = viewerRef.current.canvas.getContext("webgl2");
                gl!.getExtension("WEBGL_lose_context")!.loseContext();
                // We replace the canvas element which will also replace all the event listeners which can cause the element and things associated with it to not be correctly cleaned up by the garbage collector
                const tempClone = viewerRef.current.canvas.cloneNode(true);
                viewerRef.current.canvas.parentNode!.replaceChild(
                    tempClone,
                    viewerRef.current.canvas
                );
                // Finally, we delete the canvas element and set the viewerRef.current to null, meaning everything should be properly cleaned up
                divRef.current.removeChild(divRef.current.children[0]);
                viewerRef.current = null;
            }
        };

    }, [])
    return (
        <div onClick={(event)=>event.stopPropagation()} className={styles.mainContainer}>
            {modelLoading && 
            <div className={styles.loadBlocker}>
                <Spin tip="Model Loading" size='large'>
                    {loading}
                </Spin>
            </div>
            }
            <div className={`${styles.viewerContainer} ${modelLoading && styles.hiddenModel}`} ref={divRef}>
            
            </div>
        </div>
        
    )
}

export default DViewer