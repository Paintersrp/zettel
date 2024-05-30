package remote

import "github.com/Paintersrp/zettel/internal/db"

type ChangesPayload struct {
	Notes []db.RemoteChange
	Tags  []db.RemoteTagChange
	Links []db.RemoteLinkChange
}
