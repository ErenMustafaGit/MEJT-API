setval(pg_get_serial_sequence('users', 'id'), coalesce(max(id)+1, 1), false) FROM users;

INSERT INTO "users" VALUES (1, 'user1@gmail.com', 'user1user', 'user1', 0);
INSERT INTO "users" VALUES (2, 'user2@gmail.com', 'user2user', 'user2', 0);
INSERT INTO "users" VALUES (3, 'user3@gmail.com', 'user3user', 'user3', 1);
INSERT INTO "users" VALUES (4, 'user4@gmail.com', 'user4user', 'user4', 1);
INSERT INTO "users" VALUES (5, 'user5@gmail.com', 'user5user', 'user5', 1);
INSERT INTO "users" VALUES (6, 'user6@gmail.com', 'user6user', 'user6', 1);
INSERT INTO "users" VALUES (7, 'user7@gmail.com', 'user7user', 'user7', 1);
INSERT INTO "users" VALUES (8, 'user8@gmail.com', 'user8user', 'user8', 1);
INSERT INTO "users" VALUES (9, 'user9@gmail.com', 'user9user', 'user9', 1);

INSERT INTO "teams" VALUES (1, 'football club Villeurbanne', 1);
INSERT INTO "teams" VALUES (2, 'Entrainement perso', 1);

INSERT INTO "usersTeamMapping" VALUES (1, 3);
INSERT INTO "usersTeamMapping" VALUES (1, 4);
INSERT INTO "usersTeamMapping" VALUES (1, 5);
INSERT INTO "usersTeamMapping" VALUES (1, 6);
INSERT INTO "usersTeamMapping" VALUES (1, 7);
INSERT INTO "usersTeamMapping" VALUES (2, 8);

INSERT INTO "sessions" VALUES (1, (SELECT NOW() - interval '5 day'), 'stade de foot, Lyon', 'travail sur les jambes', 'Entrainement : Bas du corps', 1);
INSERT INTO "sessions" VALUES (2, (SELECT NOW() + interval '5 day'), 'stade de foot, Villeurbanne', 'travail sur les bras', 'Entrainement : haut du corps', 1);

INSERT INTO "feedbacksSession" VALUES (1, 5, 6, 6, 6, 'cheville droite', (SELECT NOW() - interval '3 day'), 3, 1);
INSERT INTO "feedbacksSession" VALUES (2, 8, 2, 3, 8, '', (SELECT NOW() - interval '3 day'), 4, 1);
