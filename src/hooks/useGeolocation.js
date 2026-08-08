"use client";
import { useState, useCallback, useRef } from "react";

export function useGeolocation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const watchIdRef = useRef(null);

  const getPosition = useCallback(() => {
   return new Promise(async (resolve, reject) => {
      if (!("geolocation" in navigator)) {
        const msg = "આ બ્રાઉઝર લોકેશન સપોર્ટ નથી કરતું";
        setError(msg);
        reject(new Error(msg));
        return;
      }

      setLoading(true);
      setError(null);

      let bestPosition = null;
      let readingCount = 0;
      const MAX_READINGS = 15;
      const MAX_WAIT_MS = 50000;

      const finish = () => {
        if (watchIdRef.current !== null) {
          navigator.geolocation.clearWatch(watchIdRef.current);
          watchIdRef.current = null;
        }
        setLoading(false);

        if (bestPosition) {
          console.log(
            "Final location accuracy:",
            bestPosition?.coords?.accuracy
          );
          resolve({
            lat: bestPosition.coords.latitude,
            lng: bestPosition.coords.longitude,
            accuracy: bestPosition.coords.accuracy,
          });
        } else {
          const msg = "લોકેશન મેળવવામાં ભૂલ થઈ";
       alert(readingCount)
          console.log("Final location accuracy:", bestPosition?.coords?.accuracy);
          setError(msg);
          reject(new Error(msg));
        }
      };

      const timeoutId = setTimeout(finish, MAX_WAIT_MS);

      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          readingCount += 1;

          // Keep the most accurate reading seen so far (lower accuracy value = better)
          console.log(
            `📍 Reading ${readingCount}: accuracy ±${Math.round(pos.coords.accuracy)}m`
          );

          // Ignore very poor readings
          if (pos.coords.accuracy > 1000) {
            // keep as fallback if nothing better comes
            if (!bestPosition) {
              bestPosition = pos;
            }
            return;
          }

          // Keep only usable readings
          if (!bestPosition || pos.coords.accuracy < bestPosition.coords.accuracy) {
            bestPosition = pos;
          }
          // Good enough fix (< 50m) or enough readings collected → stop early
          if (
            pos.coords.accuracy <= 20 ||
            (readingCount >= MAX_READINGS &&
              bestPosition?.coords.accuracy <= 50)
          ) {
            clearTimeout(timeoutId);
            finish();
          }
        },
        (err) => {
          clearTimeout(timeoutId);
          if (watchIdRef.current !== null) {
            navigator.geolocation.clearWatch(watchIdRef.current);
            watchIdRef.current = null;
          }
          setLoading(false);

          let msg = "લોકેશન મેળવવામાં ભૂલ થઈ";
          if (err.code === err.PERMISSION_DENIED) {
            msg = "લોકેશન પરવાનગી નકારી — બ્રાઉઝર settings માં મંજૂરી આપો";
          } else if (err.code === err.POSITION_UNAVAILABLE) {
            msg = "લોકેશન ઉપલબ્ધ નથી";
          } else if (err.code === err.TIMEOUT) {
            msg = "લોકેશન મેળવવામાં સમય વધુ લાગ્યો";
          }
          setError(msg);
          reject(new Error(msg));
        },
        {
          enableHighAccuracy: true, // GPS હોય તો ફરજિયાત વાપરે
          timeout: MAX_WAIT_MS,
          maximumAge: 0, // ← મહત્વનું: cached/stale reading ના વાપરવું, always fresh
        }
      );
    });
  }, []);

  return { getPosition, loading, error, clearError: () => setError(null) };
}