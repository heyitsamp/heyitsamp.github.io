package main

import (
	"net/http"
	"os"
)

func main() {
	//http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
	//	w.Write([]byte("Hello, world!\n"))
	//})
	panic(http.ListenAndServe(":"+os.Getenv("PORT"), http.FileServer(http.Dir("./"))))
}
