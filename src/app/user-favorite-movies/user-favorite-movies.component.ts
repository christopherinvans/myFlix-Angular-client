import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-favorite-movies',
  templateUrl: './user-favorite-movies.component.html',
  styleUrls: ['./user-favorite-movies.component.scss'],
})

/**
 * The UserFavoriteMoviesComponent class fetches and displays the
 * user's favorite movies in card format in the user profile view
 */
export class UserFavoriteMoviesComponent {
  favorites: any[] = [];
  favoriteMovies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getFavoriteMovies();
  }

  getFavoriteMovies(): void {
    this.favorites, this.favoriteMovies = [];
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favoriteMovies = resp.user.FavoriteMovies;
    });
  }

 /**
   * Check if a movie id is included in the user's favorites
   * @param id
   * @returns a boolean value
   */
  isFavorite(id: string): boolean {
    return this.favorites.includes(id);
  }

   /**
   * Add one movie id into the user's favorites with fetchApiData.addFavoriteMovie()
   * @param id
   */
  addToFavorites(id: string): void {
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

    /**
   * Remove one movie id from the user's favorites with FetchApiDataService.removeFavoriteMovie()
   * @param id
   */
  removeFromFavorites(id: string): void {
    console.log(id);
    this.fetchApiData.removeFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie removed from favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

    /**
   * Open the Genre dialog modal diplaying the movie genre info
   * @param name
   * @param description
   */
  openGenre(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '400px',
    });
  }

    /**
   * Open the Director dialog modal displaying the movie director info
   * @param name
   * @param bio 
   * @param birthday
   */
  openDirector(name: string, bio: string, birthday: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birthday,
      },
      width: '400px',
    });
  }

  /**
   * Open the Movie Details dialog modal displaying the movie title and description
   * @param title
   * @param description
   */
  openSummary(title: string, description: string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '400px',
    });
  }
}